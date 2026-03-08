FROM node:24-bookworm-slim

ARG UID=1000
ARG GID=1000

# Basic tooling pi commonly relies on inside coding environments.
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    git \
    openssh-client \
    ripgrep \
    less \
    procps \
  && rm -rf /var/lib/apt/lists/*

# Install pi CLI.
RUN npm install -g @mariozechner/pi-coding-agent

# Create (or reuse) a user matching the host user (configured via compose build args).
RUN set -eux; \
    if getent group "${GID}" >/dev/null; then \
      existing_group="$(getent group "${GID}" | cut -d: -f1)"; \
      if [ "${existing_group}" != "pi" ]; then groupmod -n pi "${existing_group}"; fi; \
    else \
      groupadd --gid "${GID}" pi; \
    fi; \
    if getent passwd "${UID}" >/dev/null; then \
      existing_user="$(getent passwd "${UID}" | cut -d: -f1)"; \
      if [ "${existing_user}" != "pi" ]; then \
        usermod -l pi -d /home/pi -m -g "${GID}" "${existing_user}"; \
      else \
        usermod -g "${GID}" pi; \
      fi; \
    else \
      useradd --uid "${UID}" --gid "${GID}" --create-home --shell /bin/bash pi; \
    fi

USER pi
WORKDIR /workspace
ENV HOME=/home/pi

# Default command opens pi in the mounted project.
CMD ["pi"]
