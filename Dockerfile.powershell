ARG VARIANT=18-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT} As production
# Install system components
RUN sudo apt update  && sudo apt install -y curl gnupg apt-transport-https

# Import the public repository GPG keys
RUN curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

# Register the Microsoft Product feed
RUN sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list'

# Install PowerShell
RUN sudo apt update && sudo apt install -y powershell
RUN pwsh -c "Install-Module -Name ExchangeOnlineManagement -force"
RUN pwsh -c "Install-Module -Name PnP.PowerShell -force"

RUN pwsh -c "Install-Module -Name Microsoft.PowerApps.Administration.PowerShell -force"

CMD [ "pwsh","-noexit" ]