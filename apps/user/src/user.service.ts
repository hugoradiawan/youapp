import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { EmailAndUsernameDto } from '@app/shared/dto/emailAndUsername.dto';
import { User } from '@app/shared/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './interfaces/profile.interface';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileAndUser } from '@app/shared/interfaces/profile-and-user';
import { HoroscopeZodiac } from '@app/shared/interfaces/horoscope-zodiac.interface';
import {
  HOROSCOPE,
  HOROSCOPE_START_DATES,
  Horoscope,
} from './enums/horoscope.enum';
import { ZodiacEndDocument } from './interfaces/zodiac-end.interface';
import { zodiacList } from './enums/zodiac.enum';
import { zodiacEndList } from './constants/zodiac-end-init.constant';
import { UpdateProfileDto } from 'apps/youapp/src/dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Profile') private readonly profileModel: Model<Profile>,
    @InjectModel('ZodiacEnd')
    private readonly zodiacEndModel: Model<ZodiacEndDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string | undefined> {
    const createdUser = new this.userModel(createUserDto);
    // createdUser.password = await bcrypt.hash(createdUser.password, 10);
    const result = await createdUser.save();
    this.createProfile(result._id.toString(), {});
    return result._id.toString();
  }

  private async createProfile(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<boolean> {
    const profile = {
      userId,
      ...createProfileDto,
    } as Profile;
    const createdProfile = new this.profileModel(profile);
    const result = await createdProfile.save();
    return result !== null;
  }

  async findOneByEmailOrByUsername(
    emailOrUsername: EmailAndUsernameDto,
  ): Promise<User | null> {
    return this.userModel
      .findOne({
        $or: [
          { email: emailOrUsername.email },
          { username: emailOrUsername.username },
        ],
      })
      .exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAllProfile(userId: string): Promise<Profile[]> {
    const profile = await this.profileModel.findOne({ userId }).exec();
    if (!profile) return [];
    const profiles = await this.profileModel
      .find({
        _id: { $ne: profile._id },
      })
      .exec();
    return profiles;
  }

  async getProfileAndUser(userId: string): Promise<ProfileAndUser | null> {
    const [profile, user] = await Promise.all([
      this.profileModel.findOne({ userId }).exec(),
      this.userModel.findById(userId).exec(),
    ]);
    if (!profile || !user) {
      return null;
    }
    return { profile, user };
  }

  private async getHoroscope(dob: string): Promise<Horoscope> {
    const [year, month, day] = dob.split('-').map(Number);
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const adjustedDay = month * 100 + day + (isLeapYear && month > 2 ? 1 : 0);
    const startDates = Object.keys(HOROSCOPE_START_DATES);
    for (let i = 0; i < startDates.length; i++) {
      const startDate = startDates[i];
      if (
        adjustedDay >= parseInt(startDate) &&
        adjustedDay < parseInt(startDates[i + 1])
      ) {
        return HOROSCOPE_START_DATES[startDate];
      }
    }
    return HOROSCOPE.Capricorn;
  }

  private async getZodiac(data: string): Promise<string | undefined> {
    const dob = new Date(data);
    const startDate = new Date('1912-02-18');
    let dbList = await this.zodiacEndModel.find();
    if (dbList.length === 0) {
      const zodiacEnd = new this.zodiacEndModel({ data: zodiacEndList });
      await zodiacEnd.save();
    }
    dbList = await this.zodiacEndModel.find();
    const endDateList = dbList[0].data;
    let deltaYear = dob.getFullYear() - startDate.getFullYear();
    const endDate = new Date(endDateList[endDateList.length - deltaYear]);
    const offset = dob.getTime() < endDate.getTime() ? 0 : 1;
    deltaYear += offset;
    const zodiacIndex = deltaYear % 12;
    const result = zodiacList.at(zodiacIndex);
    if (!result) return '';
    return result;
  }

  async getHoroscopeZodiac(birthday: string): Promise<HoroscopeZodiac | null> {
    const [horoscope, zodiac] = await Promise.all([
      this.getHoroscope(birthday),
      this.getZodiac(birthday),
    ]);
    if (!horoscope || !zodiac) return null;
    return { horoscope, zodiac };
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<boolean> {
    console.log('updateProfileDto', updateProfileDto);
    console.log('userId', userId);
    const result = await this.profileModel.updateOne(
      { userId: String(userId) },
      updateProfileDto,
    );
    console.log('result', result);
    if (result.acknowledged === false) return false;
    return result.modifiedCount === 1;
  }
}
