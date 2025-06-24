FROM golang:1.22

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum first for better caching
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go app
RUN go build -o dispatch .

# Run the binary
CMD ["./dispatch"]
