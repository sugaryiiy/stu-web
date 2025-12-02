FROM node:20-alpine

WORKDIR /app

# Copy project files into the image
COPY . .

# Default command simply echoes build success; override in derived images as needed.
CMD ["node", "-e", "console.log('stu-web image built successfully')"]
