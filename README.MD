# Adams Big Gay Project

Simple 

## Installation

Download and install Pulumi into whatever OS you want to use Pulumi in.

[https://www.pulumi.com/docs/iac/download-install/](https://www.pulumi.com/docs/iac/download-install/)

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
After editing the Pulumi.yaml, stuff your own Dockerfile and such into /app

To compile the docker, and deploy to AWS
```bash
pulumi up
```

## License

[UNLICENSED](https://choosealicense.com/licenses/unlicense/)