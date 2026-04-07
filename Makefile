CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -fsanitize=address -g -O2

SRC_DIR = src
OBJ_DIR = build
INCLUDE_DIR = include

SOURCES = $(SRC_DIR)/main.c $(SRC_DIR)/snake.c $(SRC_DIR)/food.c $(SRC_DIR)/game.c
OBJECTS = $(OBJ_DIR)/main.o $(OBJ_DIR)/snake.o $(OBJ_DIR)/food.o $(OBJ_DIR)/game.o
EXECUTABLE = $(OBJ_DIR)/snake

.PHONY: all clean run help

all: $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(CFLAGS) -o $@ $^
	@echo "✓ Compilation complete: $(EXECUTABLE)"

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -I$(INCLUDE_DIR) -c $< -o $@

clean:
	rm -rf $(OBJ_DIR)/*.o $(EXECUTABLE)
	@echo "✓ Clean complete"

run: $(EXECUTABLE)
	./$(EXECUTABLE)

help:
	@echo "Snake Game - C Terminal Edition"
	@echo "Targets:"
	@echo "  make        - Build the project"
	@echo "  make run    - Build and run"
	@echo "  make clean  - Remove build artifacts"
	@echo "  make help   - Show this help"

.DEFAULT_GOAL := all

