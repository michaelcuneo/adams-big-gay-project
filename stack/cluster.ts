import * as aws from "@pulumi/aws";

// An ECS cluster to deploy into.
export const cluster = new aws.ecs.Cluster("cluster", {
  // Complex configuration options can be set here.
});
