# Build stage
FROM gcc:11-alpine AS builder

WORKDIR /app

# Copy source files
COPY src/ ./src/
COPY include/ ./include/
COPY Makefile .

# Compile
RUN make clean && make

# Runtime stage
FROM alpine:latest

WORKDIR /app

# Copy only the compiled binary
COPY --from=builder /app/build/snake /app/snake

ENTRYPOINT ["/app/snake"]
