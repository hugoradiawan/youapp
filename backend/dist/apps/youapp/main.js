/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth/src/auth.controller.ts":
/*!******************************************!*\
  !*** ./apps/auth/src/auth.controller.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/auth/src/auth.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let AuthController = class AuthController {
    constructor(authService, sharedService) {
        this.authService = authService;
        this.sharedService = sharedService;
    }
    async register(context) {
        const extractedData = this.sharedService.extractData(context);
        try {
            const result = await this.authService.register(extractedData.data);
            extractedData.ack();
            return result;
        }
        catch (error) {
            console.log(error);
            extractedData.nack();
            return false;
        }
    }
    async login(context) {
        const extractedData = this.sharedService.extractData(context);
        try {
            const result = await this.authService.login(extractedData.data);
            extractedData.ack();
            return result;
        }
        catch (error) {
            console.log(error);
            extractedData.nack();
            return null;
        }
    }
    async refresh(context) {
        const extractedData = this.sharedService.extractData(context);
        try {
            const result = await this.authService.refresh(extractedData.data);
            extractedData.ack();
            return result;
        }
        catch (error) {
            console.log(error);
            extractedData.nack();
            return null;
        }
    }
    async hashPassword(context) {
        const extractedData = this.sharedService.extractData(context);
        try {
            const result = await this.authService.hashPassword(extractedData.data);
            extractedData.ack();
            return result;
        }
        catch (error) {
            console.log(error);
            extractedData.nack();
            return null;
        }
    }
    async validate(context) {
        const extractedData = this.sharedService.extractData(context);
        try {
            const result = await this.authService.validateJwt(extractedData.data);
            extractedData.ack();
            return result;
        }
        catch (error) {
            console.log(error);
            extractedData.nack();
            return null;
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)('register'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)('login'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)('refresh'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, microservices_1.MessagePattern)('hash-password'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthController.prototype, "hashPassword", null);
__decorate([
    (0, microservices_1.MessagePattern)('validate'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "validate", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof shared_1.SharedService !== "undefined" && shared_1.SharedService) === "function" ? _b : Object])
], AuthController);


/***/ }),

/***/ "./apps/auth/src/auth.module.ts":
/*!**************************************!*\
  !*** ./apps/auth/src/auth.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/auth/src/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/auth/src/auth.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            jwt_1.JwtModule.register({}),
            shared_1.SharedModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            {
                provide: 'USER_SERVICE',
                useFactory: (configService) => {
                    const USER = configService.get('RABBITMQ_USER');
                    const PASSWORD = configService.get('RABBITMQ_PASS');
                    const HOST = configService.get('RABBITMQ_HOST');
                    const QUEUE = configService.get('RABBITMQ_USER_QUEUE');
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                            queue: QUEUE,
                            queueOptions: { durable: true },
                        },
                    });
                },
                inject: [config_1.ConfigService],
            },
        ],
    })
], AuthModule);


/***/ }),

/***/ "./apps/auth/src/auth.service.ts":
/*!***************************************!*\
  !*** ./apps/auth/src/auth.service.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const scrypt_1 = __webpack_require__(/*! @app/shared/scrypt */ "./libs/shared/src/scrypt.ts");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const user = await (0, rxjs_1.firstValueFrom)(this.userService.send('find-user-by-email-or-username', {
            email: createUserDto.email,
            username: createUserDto.username,
        }));
        if (user !== null) {
            return {
                statusCode: 2002,
                error: 'User already exists',
            };
        }
        const userId = await (0, rxjs_1.firstValueFrom)(this.userService.send('create-user', createUserDto));
        if (!userId || userId === null) {
            return {
                statusCode: 2003,
                error: 'User creation failed',
            };
        }
        return true;
    }
    async login(loginUserDto) {
        const user = await this.validateUser(loginUserDto.usernameOrEmail, loginUserDto.password);
        if (user === null)
            return undefined;
        const payload = { sub: user._id.toString() };
        return this.generateJWT(payload);
    }
    async generateJWT(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: '15m',
                secret: process.env.JWT_ACCESS_SECRET,
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_SECRET,
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        try {
            if (refreshToken.startsWith('Bearer ')) {
                refreshToken = refreshToken.split(' ')[1];
            }
            else {
                return undefined;
            }
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            return this.generateJWT({ sub: payload.sub });
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async validateJwt(jwt) {
        try {
            const payload = await this.jwtService.verifyAsync(jwt, {
                secret: process.env.JWT_ACCESS_SECRET,
            });
            const isUserExist = await (0, rxjs_1.firstValueFrom)(this.userService.send('is-userid-exist', payload.sub));
            if (!isUserExist)
                return undefined;
            return payload;
        }
        catch (error) {
            return undefined;
        }
    }
    async hashPassword(password) {
        return scrypt_1.Scrypt.hashPassword(password);
    }
    async validateUser(emailOrUsername, password) {
        const user = await (0, rxjs_1.firstValueFrom)(this.userService.send('find-user-by-email-or-username', {
            email: emailOrUsername,
            username: emailOrUsername,
        }));
        if (user === null)
            return null;
        const isPasswordMatched = await scrypt_1.Scrypt.verifyPassword(password, user.password);
        if (isPasswordMatched) {
            const newPassword = await this.hashPassword(password);
            const result = await (0, rxjs_1.firstValueFrom)(this.userService.send('update-password', {
                userId: user._id,
                password: newPassword,
            }));
            return result ? user : null;
        }
        else {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),

/***/ "./apps/youapp/src/app.controller.ts":
/*!*******************************************!*\
  !*** ./apps/youapp/src/app.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
const create_user_dto_1 = __webpack_require__(/*! @app/shared/dto/create-user.dto */ "./libs/shared/src/dto/create-user.dto.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const login_user_dto_1 = __webpack_require__(/*! @app/shared/interfaces/login-user.dto */ "./libs/shared/src/interfaces/login-user.dto.ts");
const auth_request_type_1 = __webpack_require__(/*! @app/shared/types/auth-request.type */ "./libs/shared/src/types/auth-request.type.ts");
const auth_guard_1 = __webpack_require__(/*! ./auth.guard */ "./apps/youapp/src/auth.guard.ts");
const update_profile_dto_1 = __webpack_require__(/*! ./dto/update-profile.dto */ "./apps/youapp/src/dto/update-profile.dto.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const birthday_dto_1 = __webpack_require__(/*! ./dto/birthday.dto */ "./apps/youapp/src/dto/birthday.dto.ts");
let AppController = class AppController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async register(res, createUserDto) {
        const result = await (0, rxjs_1.firstValueFrom)(this.authService.send('register', createUserDto));
        if (result.statusCode) {
            return this.buildErrorReponse(res, result.statusCode, result.error);
        }
        else {
            return res.status(201).send();
        }
    }
    async login(res, loginUserDto) {
        const jwt = await (0, rxjs_1.firstValueFrom)(this.authService.send('login', loginUserDto));
        const isJwtValid = jwt !== null;
        return res.status(!jwt ? 400 : 200).json({
            isOk: isJwtValid,
            message: !isJwtValid ? 'Invalid username, email or password' : undefined,
            errorCode: !isJwtValid ? 2004 : undefined,
            data: !isJwtValid ? undefined : jwt,
        });
    }
    async getProfile(req, res) {
        const jwtPayload = req.payload;
        const { profile, user } = await (0, rxjs_1.firstValueFrom)(this.userService.send('get-profile-and-user', jwtPayload.sub));
        const response = {
            isOk: profile !== null && user !== null,
            ...(profile === null || user === null
                ? {
                    errorCode: 1000,
                    message: `Profile not found`,
                }
                : { data: this.sanitizeProfile(profile, user?.username) }),
        };
        return res.status(profile === null ? 404 : 201).json(response);
    }
    async update(req, res, updateProfileDto) {
        const jwtPayload = req.payload;
        let toupdate = updateProfileDto;
        if (Object.keys(toupdate).length === 0)
            return res.status(200).send();
        if (updateProfileDto.birthday) {
            if (!/^\d{4}-\d{2}-\d{2}$/.exec(updateProfileDto.birthday)) {
                return res.status(400).json({
                    isOk: false,
                    errorCode: 1003,
                    message: 'Birthday is not in the format of YYYY-MM-DD',
                });
            }
            const result = await this.getHoroscopeZodiac(updateProfileDto.birthday);
            toupdate = {
                ...updateProfileDto,
                horoscope: result?.horoscope,
                zodiac: result?.zodiac,
            };
        }
        const isOk = await (0, rxjs_1.firstValueFrom)(this.userService.send('update-profile', {
            userId: jwtPayload.sub,
            ...toupdate,
        }));
        return res.status(isOk ? 200 : 400).send();
    }
    async askHoroscopeZodiac(res, body) {
        if (!body.birthday) {
            return res.status(400).json({
                isOk: false,
                errorCode: 1004,
                message: 'Birthday is required',
            });
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.exec(body.birthday)) {
            return res.status(400).json({
                isOk: false,
                errorCode: 1005,
                message: 'Birthday is not in the format of YYYY-MM-DD',
            });
        }
        const result = await this.getHoroscopeZodiac(body.birthday);
        if (result === null) {
            return res.status(500).json({
                isOk: false,
                errorCode: 1006,
                message: 'Failed to get horoscope and/or zodiac',
            });
        }
        const response = {
            isOk: true,
            data: {
                horoscope: result.horoscope,
                zodiac: result.zodiac,
            },
        };
        return res.status(200).json(response);
    }
    async getAllProfile(req, res) {
        const jwtPayload = req.payload;
        let profiles = await (0, rxjs_1.firstValueFrom)(this.userService.send('get-all-profiles', jwtPayload.sub));
        profiles = profiles.filter((profile) => profile.name !== undefined);
        const response = {
            isOk: true,
            data: profiles,
        };
        return res.status(200).json(response);
    }
    async refreshToken(req, res) {
        const jwt = await (0, rxjs_1.firstValueFrom)(this.authService.send('refresh', req.headers['x-refresh-token']));
        const isJwtValid = jwt !== null;
        return res.status(!jwt ? 401 : 200).json({
            isOk: isJwtValid,
            message: !isJwtValid ? 'Invalid refresh token' : undefined,
            errorCode: !isJwtValid ? 2005 : undefined,
            data: !isJwtValid ? undefined : jwt,
        });
    }
    async isUsernameExist(data, res) {
        const result = await (0, rxjs_1.firstValueFrom)(this.userService.send('is-username-exist', data.username));
        return res.status(200).json({
            isOk: true,
            data: result,
        });
    }
    getHoroscopeZodiac(birthday) {
        return (0, rxjs_1.firstValueFrom)(this.userService.send('get-horoscope-zodiac', birthday));
    }
    buildErrorReponse(res, errorCode, message) {
        return res.status(500).json({
            isOk: false,
            errorCode,
            message,
        });
    }
    sanitizeProfile(data, username) {
        const { _id, name, birthday, heightInCm, weightInKg, gender, interests, zodiac, horoscope, } = data;
        const tempdata = {
            pId: _id,
            name,
            birthday,
            username,
            heightInCm,
            weightInKg,
            gender,
            interests,
            zodiac,
            horoscope,
        };
        if (tempdata.interests?.length === 0)
            delete tempdata.interests;
        return tempdata;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiTags)('Authentification'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Register successfully',
        content: {
            'application/json': {
                example: {
                    isOk: true,
                },
            },
        },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiTags)('Authentification'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Login successfully',
        content: {
            'application/json': {
                example: {
                    isOk: true,
                    data: {
                        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid username, email or password',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 2004,
                    message: 'Invalid username, email or password',
                },
            },
        },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof login_user_dto_1.LoginUserDto !== "undefined" && login_user_dto_1.LoginUserDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('getProfile'),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'with bearer prefix',
        required: true,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Get profile successfully',
        content: {
            'application/json': {
                example: {
                    isOk: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Profile not found',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 1000,
                    message: 'Profile not found',
                },
            },
        },
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof auth_request_type_1.AuthRequest !== "undefined" && auth_request_type_1.AuthRequest) === "function" ? _j : Object, typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('updateProfile'),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'with bearer prefix',
        required: true,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Birthday is not in the format of YYYY-MM-DD',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 1003,
                    message: 'Birthday is not in the format of YYYY-MM-DD',
                },
            },
        },
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Failed to update profile',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 1002,
                    message: 'Failed to update profile',
                },
            },
        },
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof auth_request_type_1.AuthRequest !== "undefined" && auth_request_type_1.AuthRequest) === "function" ? _m : Object, typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, typeof (_p = typeof update_profile_dto_1.UpdateProfileDto !== "undefined" && update_profile_dto_1.UpdateProfileDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], AppController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('askHoroscopeZodiac'),
    (0, swagger_1.ApiTags)('Utilities'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get horoscope and zodiac successfully',
        content: {
            'application/json': {
                example: {
                    isOk: true,
                    data: {
                        horoscope: 'Capricorn',
                        zodiac: 'Dragon',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Birthday is required',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 1004,
                    message: 'Birthday is required',
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Birthday is not in the format of YYYY-MM-DD',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 1005,
                    message: 'Birthday is not in the format of YYYY-MM-DD',
                },
            },
        },
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Failed to get horoscope and/or zodiac',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 1006,
                    message: 'Failed to get horoscope and/or zodiac',
                },
            },
        },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object, typeof (_s = typeof birthday_dto_1.BirthdayDto !== "undefined" && birthday_dto_1.BirthdayDto) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], AppController.prototype, "askHoroscopeZodiac", null);
__decorate([
    (0, common_1.Get)('profiles'),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'with bearer prefix',
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Get all profiles successfully',
        content: {
            'application/json': {
                example: {
                    isOk: true,
                    data: [
                        {
                            id: '60f0b0b3e6b3c3b3b4b3b3b3',
                            name: 'John Doe',
                            birthday: '2000-01-01',
                            username: 'johndoe',
                        },
                        {
                            id: '60f0b0b3e6b3c3b3b4b3b3b4',
                            name: 'Jane Doe',
                            birthday: '2000-01-02',
                            username: 'janedoe',
                        },
                    ],
                },
            },
        },
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof auth_request_type_1.AuthRequest !== "undefined" && auth_request_type_1.AuthRequest) === "function" ? _u : Object, typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], AppController.prototype, "getAllProfile", null);
__decorate([
    (0, common_1.Get)('refresh'),
    (0, swagger_1.ApiTags)('Authentification'),
    (0, swagger_1.ApiHeader)({
        name: 'x-refresh-token',
        description: 'with bearer prefix',
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Refresh token successfully',
        content: {
            'application/json': {
                example: {
                    isOk: true,
                    data: {
                        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid refresh token',
        content: {
            'application/json': {
                example: {
                    isOk: false,
                    errorCode: 2005,
                    message: 'Invalid refresh token',
                },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof auth_request_type_1.AuthRequest !== "undefined" && auth_request_type_1.AuthRequest) === "function" ? _x : Object, typeof (_y = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _y : Object]),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], AppController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('isUsernameExist'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_0 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _0 : Object]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], AppController.prototype, "isUsernameExist", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(1, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], AppController);


/***/ }),

/***/ "./apps/youapp/src/app.module.ts":
/*!***************************************!*\
  !*** ./apps/youapp/src/app.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/youapp/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/youapp/src/app.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const auth_module_1 = __webpack_require__(/*! apps/auth/src/auth.module */ "./apps/auth/src/auth.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            jwt_1.JwtModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: 'AUTH_SERVICE',
                useFactory: (configService) => {
                    const USER = configService.get('RABBITMQ_USER');
                    const PASSWORD = configService.get('RABBITMQ_PASS');
                    const HOST = configService.get('RABBITMQ_HOST');
                    const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE');
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                            queue: QUEUE,
                            queueOptions: {
                                durable: true,
                            },
                        },
                    });
                },
                inject: [config_1.ConfigService],
            },
            {
                provide: 'USER_SERVICE',
                useFactory: (configService) => {
                    const USER = configService.get('RABBITMQ_USER');
                    const PASSWORD = configService.get('RABBITMQ_PASS');
                    const HOST = configService.get('RABBITMQ_HOST');
                    const QUEUE = configService.get('RABBITMQ_USER_QUEUE');
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                            queue: QUEUE,
                            queueOptions: {
                                durable: true,
                            },
                        },
                    });
                },
                inject: [config_1.ConfigService],
            },
        ],
    })
], AppModule);


/***/ }),

/***/ "./apps/youapp/src/app.service.ts":
/*!****************************************!*\
  !*** ./apps/youapp/src/app.service.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),

/***/ "./apps/youapp/src/auth.guard.ts":
/*!***************************************!*\
  !*** ./apps/youapp/src/auth.guard.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let AuthGuard = class AuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractBearerTokenFromHeader(request);
        if (!token)
            return false;
        try {
            const payload = await (0, rxjs_1.firstValueFrom)(this.authService.send('validate', token));
            if (!payload)
                return false;
            request.payload = payload;
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    extractBearerTokenFromHeader(request) {
        const token = request.headers['x-access-token'];
        if (!token || token === undefined)
            return undefined;
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return undefined;
        }
        return tokenParts[1];
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AuthGuard);


/***/ }),

/***/ "./apps/youapp/src/dto/birthday.dto.ts":
/*!*********************************************!*\
  !*** ./apps/youapp/src/dto/birthday.dto.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BirthdayDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class BirthdayDto {
}
exports.BirthdayDto = BirthdayDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The birthday of the user',
        type: String,
        example: '2000-01-01',
    }),
    __metadata("design:type", String)
], BirthdayDto.prototype, "birthday", void 0);


/***/ }),

/***/ "./apps/youapp/src/dto/update-profile.dto.ts":
/*!***************************************************!*\
  !*** ./apps/youapp/src/dto/update-profile.dto.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfileDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the user',
        type: String,
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The username of the user',
        type: String,
        example: 'johndoe',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        type: String,
        example: 'johndoe@test.id',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        description: 'The gender of the user',
        type: Boolean,
        example: true,
    }),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'The horoscope of the user',
        type: Number,
        example: 1,
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "heightInCm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'The horoscope of the user',
        type: Number,
        example: 1,
    }),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "weightInKg", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        description: 'The interests of the user',
        type: [String],
        example: ['music', 'movies'],
    }),
    __metadata("design:type", Array)
], UpdateProfileDto.prototype, "interests", void 0);


/***/ }),

/***/ "./libs/shared/src/dto/create-user.dto.ts":
/*!************************************************!*\
  !*** ./libs/shared/src/dto/create-user.dto.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The username of the new user',
        type: String,
        example: 'johndoe',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'The email of the new user',
        type: String,
        example: 'johndoe@example.com',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, swagger_1.ApiProperty)({
        description: 'The password of new the user',
        type: String,
        example: '123456',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);


/***/ }),

/***/ "./libs/shared/src/index.ts":
/*!**********************************!*\
  !*** ./libs/shared/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./shared.module */ "./libs/shared/src/shared.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./shared.service */ "./libs/shared/src/shared.service.ts"), exports);


/***/ }),

/***/ "./libs/shared/src/interfaces/login-user.dto.ts":
/*!******************************************************!*\
  !*** ./libs/shared/src/interfaces/login-user.dto.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The username or email of the user',
        type: String,
        example: 'johndoe',
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "usernameOrEmail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, swagger_1.ApiProperty)({
        description: 'The password of the user',
        type: String,
        example: '123456',
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);


/***/ }),

/***/ "./libs/shared/src/interfaces/rmq-data.interface.ts":
/*!**********************************************************!*\
  !*** ./libs/shared/src/interfaces/rmq-data.interface.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqData = void 0;
class RmqData {
    constructor(channel, message, event) {
        this.channel = channel;
        this.message = message;
        this.event = event;
    }
    nack() {
        this.channel.nack(this.message);
    }
    ack() {
        this.channel.ack(this.message);
    }
    get data() {
        return this.event.data;
    }
}
exports.RmqData = RmqData;


/***/ }),

/***/ "./libs/shared/src/scrypt.ts":
/*!***********************************!*\
  !*** ./libs/shared/src/scrypt.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scrypt = void 0;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
class Scrypt {
    static async hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const derivedKey = (0, crypto_1.scryptSync)(password, salt, 64).toString('hex');
        return salt + ':' + derivedKey;
    }
    static async verifyPassword(password, hash) {
        const [salt, key] = hash.split(':');
        const derivedKey = (0, crypto_1.scryptSync)(password, salt, 64).toString('hex');
        return key === derivedKey;
    }
}
exports.Scrypt = Scrypt;


/***/ }),

/***/ "./libs/shared/src/shared.module.ts":
/*!******************************************!*\
  !*** ./libs/shared/src/shared.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_service_1 = __webpack_require__(/*! ./shared.service */ "./libs/shared/src/shared.service.ts");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        providers: [shared_service_1.SharedService],
        exports: [shared_service_1.SharedService],
    })
], SharedModule);


/***/ }),

/***/ "./libs/shared/src/shared.service.ts":
/*!*******************************************!*\
  !*** ./libs/shared/src/shared.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rmq_data_interface_1 = __webpack_require__(/*! ./interfaces/rmq-data.interface */ "./libs/shared/src/interfaces/rmq-data.interface.ts");
let SharedService = class SharedService {
    extractData(context) {
        const channel = context.getChannelRef();
        const message = context.getMessage();
        const event = JSON.parse(message.content.toString());
        return new rmq_data_interface_1.RmqData(channel, message, event);
    }
};
exports.SharedService = SharedService;
exports.SharedService = SharedService = __decorate([
    (0, common_1.Injectable)()
], SharedService);


/***/ }),

/***/ "./libs/shared/src/types/auth-request.type.ts":
/*!****************************************************!*\
  !*** ./libs/shared/src/types/auth-request.type.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************************!*\
  !*** ./apps/youapp/src/main.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/youapp/src/app.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('YouApp Gateway API')
        .setDescription('YouApp API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;