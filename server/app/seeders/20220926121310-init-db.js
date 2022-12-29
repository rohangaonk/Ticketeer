"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

//create users
const users = [
  {
    id: uuidv4(),
    email: "gaonkar70@gmail.com",
    password: bcrypt.hashSync("1234", 8),
  },
  {
    id: uuidv4(),
    email: "rohan@gmail.com",
    password: bcrypt.hashSync("1234", 8),
  },
  {
    id: uuidv4(),
    email: "roy@gmail.com",
    password: bcrypt.hashSync("1234", 8),
  },
];

const body = `Lorem ipsum dolor sit amet,
 consectetur adipiscing elit, sed do eiusmod tempor 
 incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation `;

const tickets = [
  {
    id: uuidv4(),
    assigneeId: users[0].id,
    assignorId: users[1].id,
    title: "User login not working",
    status: "open",
    priority: "high",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[0].id,
    assignorId: users[2].id,
    title: "location not visible",
    status: "closed",
    priority: "low",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[1].id,
    assignorId: users[2].id,
    title: "cart total mismatch",
    status: "open",
    priority: "low",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[0].id,
    assignorId: users[1].id,
    title: "payment not working",
    status: "open",
    priority: "medium",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[2].id,
    assignorId: users[1].id,
    title: "filter not working",
    status: "open",
    priority: "medium",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[2].id,
    assignorId: users[0].id,
    title: "signup phone number issue",
    status: "closed",
    priority: "low",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[0].id,
    assignorId: users[1].id,
    title: "app logo not loading",
    status: "open",
    priority: "medium",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[1].id,
    assignorId: users[2].id,
    title: "checkout issue not resolved",
    status: "open",
    priority: "high",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[2].id,
    assignorId: users[1].id,
    title: "homepage not displaying filters",
    status: "open",
    priority: "medium",
    body,
  },
  {
    id: uuidv4(),
    assigneeId: users[2].id,
    assignorId: users[0].id,
    title: "app stuck on order screen",
    status: "closed",
    priority: "high",
    body,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      users.map((user) => ({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
    await queryInterface.bulkInsert(
      "tickets",
      tickets.map((ticket) => ({
        ...ticket,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
    return;
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
