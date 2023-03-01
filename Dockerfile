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
    && pip3 install --upgrade pip

ARG DJANGO_SECRET_KEY

RUN mkdir -p /app
RUN mkdir -p /app/ReadyFront

ADD ./ReadyBack /app
COPY ./ReadyFront /app/ReadyFront
ADD requirements.txt /app

WORKDIR /app

RUN pip install -r requirements.txt