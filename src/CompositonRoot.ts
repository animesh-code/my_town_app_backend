import mongoose from "mongoose";
import redis from "redis";
import AuthRepository from "./auth/data/repository/AuthRepository";
import VerifyRepository from "./auth/data/repository/VerifyRepository";
import JwtTokenService from "./auth/data/services/JwtTokenService";
import RedisTokenStore from "./auth/data/services/RedisTokenStore";
import AuthRouter from "./auth/entrypoint/routers/AuthRouter";
import VerificationRouter from "./auth/entrypoint/routers/VerificationRouter";
import TokenValidator from "./auth/helpers/TokenValidator";
import ShopRepository from "./businesses/data/repositories/ShopRepository";
import CategoryRouter from "./businesses/enetrypoint/routers/CategoryRouter";
import ItemRouter from "./businesses/enetrypoint/routers/ItemRouter";
import ShopCategoryRouter from "./businesses/enetrypoint/routers/ShopCategoryRouters";
import ShopRouter from "./businesses/enetrypoint/routers/ShopRouter";
import PlaceRepository from "./location/data/repositories/PlaceRepository";
import PlaceRouter from "./location/entrypoint/PlaceRouter";

export default class CompositionRoot {
  private static client: mongoose.Mongoose;
  private static redisClient: redis.RedisClient;

  public static configure() {
    this.client = new mongoose.Mongoose();
    this.redisClient = redis.createClient();
    const connectionStr = encodeURI(process.env.TEST_DB as string);
    this.client.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public static authRouter() {
    const repository = new AuthRepository(this.client);
    const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string);
    const tokenStore = new RedisTokenStore(this.redisClient);
    const tokenValidator = new TokenValidator(tokenService, tokenStore);

    return AuthRouter.configure(
      repository,
      tokenService,
      tokenStore,
      tokenValidator
    );
  }
  public static verifyRouter() {
    const repository = new VerifyRepository();
    return VerificationRouter.configure(repository);
  }

  public static shopCategoryRouter() {
    const repository = new ShopRepository(this.client);
    const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string);
    const tokenStore = new RedisTokenStore(this.redisClient);
    const tokenValidator = new TokenValidator(tokenService, tokenStore);

    return ShopCategoryRouter.configure(repository, tokenValidator);
  }

  public static shopRouter() {
    const repository = new ShopRepository(this.client);
    const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string);
    const tokenStore = new RedisTokenStore(this.redisClient);
    const tokenValidator = new TokenValidator(tokenService, tokenStore);

    return ShopRouter.configure(repository, tokenValidator);
  }

  public static categoryRouter() {
    const repository = new ShopRepository(this.client);
    const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string);
    const tokenStore = new RedisTokenStore(this.redisClient);
    const tokenValidator = new TokenValidator(tokenService, tokenStore);

    return CategoryRouter.configure(repository, tokenValidator);
  }

  public static itemRouter() {
    const repository = new ShopRepository(this.client);
    const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string);
    const tokenStore = new RedisTokenStore(this.redisClient);
    const tokenValidator = new TokenValidator(tokenService, tokenStore);

    return ItemRouter.configure(repository, tokenValidator);
  }

  public static placeRouter() {
    const repository = new PlaceRepository(this.client);

    return PlaceRouter.configure(repository);
  }
}
