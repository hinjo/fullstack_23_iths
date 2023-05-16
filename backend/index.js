const express = require("express");
// const sqlite = require("sqlite");
const { Sequelize, Op, DataTypes } = require("sequelize");
const sqlite3 = require("sqlite3");

const app = express();

//1 ladda databas
let sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "backend/fullstackdb.sqlite",
});

sequelize.query("PRAGMA foreign_keys = ON");

//1.2 skapa modellerna för x och y - rad 17 tom 60
const Profile = sequelize.define(
  "Profile",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nickname: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    age: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

const Post = sequelize.define(
  "Post",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    post: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Profile.hasMany(Post, { foreignKey: "profile" });

//1.1 koppla upp till db - rad 63
sequelize.sync();

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//2 skapa routes (get och kanske post)
app.get("/posts/:id", async (request, response) => {
  try {
    console.log(request.params.id);
    const id = request.params.id;
    console.log(id);
    let posts = await Post.findAll({
      where: {
        profile: id,
      },
    });

    console.log(posts);

    response.send(posts);
  } catch (err) {
    console.log(err);
  }
});

// app.get("/:nickname", async (request, response) => {
//   try {
//     const nickname = request.params.nickname;
//     console.log(nickname);
//     let profile = await Profile.findAll({
//       where: {
//         nickname: nickname,
//       },
//     });

//     console.log(profile);

//     response.send(profile);
//   } catch (err) {
//     console.log(err);
//   }
// });

const port = process.env.PORT || 8081;

app.listen({ port: port }, (e) => console.log("Lyssnar på port " + port));
