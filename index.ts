import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

// An ECS cluster to deploy into.
const cluster = new aws.ecs.Cluster("cluster", {});

// An ALB to serve the container endpoint to the internet.
const loadbalancer = new awsx.lb.ApplicationLoadBalancer("loadbalancer", {});

// An ECR repository to store our application's container image.
const repo = new awsx.ecr.Repository("repo", {
  forceDelete: true,
});

// Build and publish our application's container image from ./app to the ECR repository.
const image = new awsx.ecr.Image("image", {
  repositoryUrl: repo.url,
  context: "./app",
  platform: "linux/amd64",
});

// Deploy an ECS Service on Fargate to host the application container.
const service = new awsx.ecs.FargateService("service", {
  cluster: cluster.arn,
  assignPublicIp: true,
  taskDefinitionArgs: {
    container: {
      name: "service-container",
      image: image.imageUri,
      cpu: 128,
      memory: 512,
      essential: true,
      portMappings: [{
        containerPort: 80,
        targetGroup: loadbalancer.defaultTargetGroup,
      }],
    },
  },
});

const route = new aws.route53.Record("route", {
  name: "api.michaelcuneo.com.au",
  zoneId: "Z3KVC5NISS5BSI",
  type: "A",
  aliases: [{
    evaluateTargetHealth: true,
    name: loadbalancer.loadBalancer.dnsName,
    zoneId: loadbalancer.loadBalancer.zoneId,
  }],
});


// The URL at which the container's HTTP endpoint will be available.
export const frontendURL = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`;
export const actualUrl = route.name;