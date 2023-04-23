FROM python:3.11 as base

FROM base as readymade

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
    build-essential \
    libcurl4-openssl-dev \
    libssl-dev \
    libffi-dev \
    python3-dev \
    libjpeg-dev \
    zlib1g-dev \
    gcc \
    libc-dev \
    bash \
    nodejs \
    npm \
    curl \
    && pip3 install --upgrade pip

ENV PYTHONDONTWRITEBYTECODE 1


RUN mkdir -p /app

ADD ./ReadyBack /app
ADD requirements.txt /app

WORKDIR /app

RUN pip install -r requirements.txt
RUN python manage.py collectstatic --no-input
