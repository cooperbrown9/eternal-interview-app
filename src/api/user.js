import { http } from "./api";

const USER = "/user";

// /user/:userId/follow
const FOLLOW = (userId) => `${USER}/${userId}/follow`;
const UNFOLLOW = (userId) => `${USER}/${userId}/unfollow`;

export function get(userId) {
  return http.get(`${USER}/${userId}`);
}

export function update(user) {
  const data = {
    user
  }
  return http.post(`${USER}/${user._id}`, data);
}

export function listFollow(userId, type) {
    console.log('listfollow', userId)
  return http.get(`${FOLLOW(userId)}?type=${type}`);
}

export function follow(userId, toFollowId) {
  const data = {
    following: toFollowId,
  };
  return http.post(`${FOLLOW(userId)}`, data);
}

export function unfollow(userId, toUnfollowId) {
  const data = {
    following: toUnfollowId
  };
  return http.post(`${UNFOLLOW(userId)}`, data);
}

export function isFollowing(userId, followingId) {
  return http.get(`${FOLLOW(userId)}/${followingId}`);
}

export function find(text) {
    return http.get(`${USER}?name=${text}`)
}