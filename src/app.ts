import express from "express";
import dotenv from "dotenv";
import CompositionRoot from "./CompositonRoot";

dotenv.config();
CompositionRoot.configure();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", CompositionRoot.authRouter(), CompositionRoot.verifyRouter());
app.use("/shopCategory", CompositionRoot.shopCategoryRouter());
app.use("/shop", CompositionRoot.shopRouter());
app.use("/category", CompositionRoot.categoryRouter());
app.use("/item", CompositionRoot.itemRouter());
app.use("/place", CompositionRoot.placeRouter());

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
