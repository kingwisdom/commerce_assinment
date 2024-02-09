import JWT from "jsonwebtoken";
import Boom from "boom";

// import redis from "../clients/redis";
const secret = "gGw4nLJyULfr6xWz+r/ALbFqwfN+suID5AafNzUTC0zgprESTc5nTVjdjqMkADRTQba9JAfEGOQtguhCPGxmoBU3kKfsfm8Bpua9LidqveO4qW+QTgLEHb63Q+PUiuWC4d/uj+40hPKFioNq9K69uT6FfBOaLQ1r7NkQfGAN9F73/im15PxDn/iIBoK2eokNGtHdwoqRAJJUSABniXfGH5bRHWt86cCMd7Mq9awSrLnJ/OD08vNtkqIJa7JReLoq9LuU4sM7YmgZ6hVw208SIu6D2mFsIp8bH/LijE7J58JA/g9SLip55BSzhlWGgCO6ObBB"
const signAccessToken = (data) => {
	return new Promise((resolve, reject) => {
		const payload = {
			...data,
		};

		const options = {
			expiresIn: "10d",
			issuer: "ecommerce.app",
		};

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());
			}

			resolve(token);
		});
	});
};

const verifyAccessToken = (req, res, next) => {
	const authorizationToken = req.headers["authorization"];
	if (!authorizationToken) {
		next(Boom.unauthorized());
	}

	JWT.verify(authorizationToken, secret, (err, payload) => {
		if (err) {
			return next(
				Boom.unauthorized(
					err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
				)
			);
		}

		req.payload = payload;
		next();
	});
};

const signRefreshToken = (user_id) => {
	return new Promise((resolve, reject) => {
		const payload = {
			user_id,
		};
		const options = {
			expiresIn: "180d",
			issuer: "ecommerce.app",
		};

		JWT.sign(payload, secret, options, (err, token) => {
			if (err) {
				console.log(err);
				reject(Boom.internal());
			}

			// redis.set(user_id, token, "EX", 180 * 24 * 60 * 60);

			resolve(token);
		});
	});
};

const verifyRefreshToken = async (refresh_token) => {
	return new Promise(async (resolve, reject) => {
		JWT.verify(
			refresh_token,
			secret,
			async (err, payload) => {
				if (err) {
					return reject(Boom.unauthorized());
				}

				const { user_id } = payload;
				// const user_token = await redis.get(user_id);

				if (!user_token) {
					return reject(Boom.unauthorized());
				}

				if (refresh_token === user_token) {
					return resolve(user_id);
				}
			}
		);
	});
};

export {
	signAccessToken,
	verifyAccessToken,
	signRefreshToken,
	verifyRefreshToken,
};
