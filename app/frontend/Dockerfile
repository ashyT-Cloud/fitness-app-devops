# Base Image
FROM nginx:alpine

# Remove default website
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend files
COPY . /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose web port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
