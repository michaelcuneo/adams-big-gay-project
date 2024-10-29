import * as awsx from "@pulumi/awsx";

// An ALB to serve the container endpoint to the internet.
export const loadbalancer = new awsx.lb.ApplicationLoadBalancer("loadbalancer", {
  // Complex configuration options can be set here.
});
