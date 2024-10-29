import * as aws from "@pulumi/aws";
import { loadbalancer } from "./alb";

// Check to see if the route exists, if it does, don't create it.
// We eventually want this record to come from a module output.
// TODO: Fix this so that it does not try and create a route if it exists.
export const routeExists = aws.route53.Record.get("routeExists", "Z3KVC5NISS5BSI_api.michaelcuneo.com.au_A");

// A route to the load balancer, so we don't have to hit a dodgy URL.
export const route = new aws.route53.Record("route", {
  name: "api.michaelcuneo.com.au",
  zoneId: "Z3KVC5NISS5BSI",
  type: "A",
  aliases: [{
    evaluateTargetHealth: true,
    name: loadbalancer.loadBalancer.dnsName,
    zoneId: loadbalancer.loadBalancer.zoneId,
  }],
});

// Obtain a certificate for the domain.
export const certificate = new aws.acm.Certificate("certificate", {
  domainName: route.name,
  validationMethod: "DNS",
});