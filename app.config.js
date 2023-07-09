module.exports = ({ config }) => ({
  ...config,
  extra: {
    ENV: process.env.ENV || "dev",
    eas: {
      // projectId: "c5ed18ff-989f-4bed-934b-ccce0c4d67f5", // for qinghua
       projectId: "462bceb9-15ba-4d76-bcad-d93ef54c4c31", // for sunhao
    },
  },
});
