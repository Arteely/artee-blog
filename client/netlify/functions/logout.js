module.exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0",
      },
      body: JSON.stringify("Logged out"),
    };
  };
  