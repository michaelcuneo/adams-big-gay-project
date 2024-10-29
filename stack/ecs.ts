import * as awsx from "@pulumi/awsx";
import { cluster } from "./cluster";
import { image } from "./ecr";
import { loadbalancer } from "./alb";

// Deploy an ECS Service on Fargate to host the application container.
export const service = new awsx.ecs.FargateService("service", {
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
