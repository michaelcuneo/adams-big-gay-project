# Adams Big Gay Project

Simple

## Changelog

Because sometimes the configuration of stacks can become complex as the infrastructure becomes larger, breaking each AWS component out into individual files and importing them to the index.ts based on rules, i.e. *you can't make a route53 if it already exists*, is a good idea.

So there is now a folder called stack, and each AWS component is in stack...

stack/
 - alb.ts
 - cluster.ts
 - ecr.ts
 - ecs.ts
 - route53.ts

## Installation

Download and install Pulumi into whatever OS you want to use Pulumi in.

[https://www.pulumi.com/docs/iac/download-install/](https://www.pulumi.com/docs/iac/download-install/)

Make sure Docker Desktop or some other form of the Docker service is running so that it caan make the image.

## Usage

Clone this repo and install the node dependencies.
```bash
git clone https://github.com/michaelcuneo/adams-big-gay-project.git
cd adams-big-gay-project
npm i
```

Edit the Pulumi.yaml to suit your own project.

```
...
name: "sub.domain.com",
zoneId: "youractualzoneid",
...
```
After editing the Pulumi.yaml, replace the dockerfile and app and any other assets your docker requires into /app

To compile the docker, and deploy to AWS
```bash
pulumi up
```

## Coming Soon
There's no logic in there yet to update the stack, test to see if the ECR is running/up, so it will fail on updates. I'll fix this so that it checks and updates accordingly.

## License

[UNLICENSED](https://choosealicense.com/licenses/unlicense/)