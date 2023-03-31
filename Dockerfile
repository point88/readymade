FROM python:3.11 as base

FROM base as readymade

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    gcc \
    libc-dev \
    bash \
    git \
    nodejs \
    npm \
    && pip3 install --upgrade pip

#ARG DJANGO_SECRET_KEY

ENV PYTHONDONTWRITEBYTECODE 1


RUN mkdir -p /app

ADD ./ReadyBack /app
ADD requirements.txt /app

ADD ./readymade-frontend /app

WORKDIR /app

RUN pip install -r requirements.txt

RUN npm install
CMD ["npm", "start"]