FROM gcr.io/google-appengine/python

# Create a virtualenv for dependencies. This isolates these packages from
# system-level packages.
# Use -p python3 or -p python3.7 to select python version. Default is version 2.
RUN virtualenv /env -p python3.7 

# Setting these environment variables are the same as running
# source /env/bin/activate.
ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH



RUN apt-get update -qq \
 && apt-get install --no-install-recommends -y \
    # install essentials
    build-essential \
    g++ \
    git



# Copy the application's requirements.txt and run pip to install all
# dependencies into the virtualenv.
ADD requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# # Add the application source code.
# ADD . /app

# # Run a WSGI server to serve the application. gunicorn must be declared as
# # a dependency in requirements.txt.
# CMD gunicorn -b :$PORT main:app

# ADD echoserver.py ./
# CMD gunicorn -b :$PORT echoserver:app

COPY main.py ./
COPY application ./application
COPY models ./models
COPY twitteremotionrecognition ./twitteremotionrecognition

ENV KERAS_BACKEND=theano
# entrypoint: KERAS_BACKEND=theano gunicorn -b :8080 -w 1 main:app --timeout 600
CMD gunicorn -b :$PORT -w 1 main:app --timeout 600
