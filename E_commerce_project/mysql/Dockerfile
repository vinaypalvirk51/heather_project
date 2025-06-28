FROM mysql:5.7

# Create a mount point for persistent MySQL data
VOLUME /data

# Environment variables (not secure, but common for local/dev use)
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes \
    MYSQL_DATABASE=cities \
    MYSQL_USER=shipping \
    MYSQL_PASSWORD=secret

# Copy config script and ensure it's executable
COPY config.sh /root/
RUN chmod +x /root/config.sh && /root/config.sh

# Copy initialization SQL scripts
COPY scripts/* /docker-entrypoint-initdb.d/
