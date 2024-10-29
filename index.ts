import * as pulumi from "@pulumi/pulumi";
import { route, certificate } from "./stack/route53";
import { loadbalancer } from "./stack/alb";
import { service } from "./stack/ecs";

// Export the service ARN for the ECS service.
export const serviceArn = service.urn;

// Export the record Id for the route.
export const recordId = route.id;

// The certificate ARN for the domain.
export const certificateArn = certificate.arn;

// The dodgy URL at which the container's HTTP endpoint will be available.
export const frontendURL = pulumi.interpolate`http://${loadbalancer.loadBalancer.dnsName}`;

// The nice URL aliased to the load balancer url.
export const frontendURLNice = pulumi.interpolate`https://${route.name}`;
