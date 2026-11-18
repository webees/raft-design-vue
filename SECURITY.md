# Security Policy

## Supported versions

The project is pre-1.0. Security fixes land on `main` and are released in the
next patch version. Only the latest published minor receives fixes.

## Reporting a vulnerability

Do not open a public issue. Use GitHub's private vulnerability reporting:

1. Open the repository's **Security** tab.
2. Choose **Report a vulnerability**.
3. Include affected version, a minimal reproduction, impact and any suggested
   mitigation.

You can expect an initial acknowledgement within 72 hours. We will coordinate a
fix and disclosure date with you. Please allow a reasonable remediation window
before publishing details.

## Scope

This repository is a Vue port of a design system. Vulnerabilities in upstream
Raft code should be reported to the upstream project as well. Dependency
vulnerabilities are handled through Dependabot and `bun audit`.
