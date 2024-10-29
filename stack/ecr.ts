import * as awsx from "@pulumi/awsx";

// An ECR repository to store our application's container image.
export const repo = new awsx.ecr.Repository("repo", {
  forceDelete: true,
});

// Build and publish our application's container image from ./app to the ECR repository.
export const image = new awsx.ecr.Image("image", {
  repositoryUrl: repo.url,
  context: "./app",
  platform: "linux/amd64",
});