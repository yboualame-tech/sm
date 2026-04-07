#include <stdlib.h>
#include <string.h>
#include "../include/snake.h"

Snake* snake_create(void) {
    Snake* snake = (Snake*)malloc(sizeof(Snake));
    if (snake == NULL) {
        return NULL;
    }

    snake->length = 3;
    snake->direction = RIGHT;
    snake->next_direction = RIGHT;

    // Initialize snake body (head at middle, body extends left)
    snake->body[0].x = GRID_WIDTH / 2;
    snake->body[0].y = GRID_HEIGHT / 2;
    snake->body[1].x = GRID_WIDTH / 2 - 1;
    snake->body[1].y = GRID_HEIGHT / 2;
    snake->body[2].x = GRID_WIDTH / 2 - 2;
    snake->body[2].y = GRID_HEIGHT / 2;

    return snake;
}

void snake_free(Snake* snake) {
    if (snake != NULL) {
        free(snake);
    }
}

void snake_move(Snake* snake) {
    // Update direction
    snake->direction = snake->next_direction;

    // Shift body segments
    for (int i = snake->length - 1; i > 0; i--) {
        snake->body[i] = snake->body[i - 1];
    }

    // Move head
    Segment head = snake->body[0];
    switch (snake->direction) {
        case UP:
            head.y--;
            break;
        case DOWN:
            head.y++;
            break;
        case LEFT:
            head.x--;
            break;
        case RIGHT:
            head.x++;
            break;
    }

    snake->body[0] = head;
}

void snake_change_direction(Snake* snake, Direction dir) {
    // Prevent reversing into itself
    if ((snake->direction == UP && dir == DOWN) ||
        (snake->direction == DOWN && dir == UP) ||
        (snake->direction == LEFT && dir == RIGHT) ||
        (snake->direction == RIGHT && dir == LEFT)) {
        return;
    }
    snake->next_direction = dir;
}

void snake_grow(Snake* snake) {
    if (snake->length < MAX_SNAKE_LENGTH) {
        snake->length++;
    }
}

int snake_collides_with_self(Snake* snake) {
    Segment head = snake->body[0];
    for (int i = 1; i < snake->length; i++) {
        if (head.x == snake->body[i].x && head.y == snake->body[i].y) {
            return 1;
        }
    }
    return 0;
}

int snake_out_of_bounds(Snake* snake) {
    Segment head = snake->body[0];
    if (head.x < 0 || head.x >= GRID_WIDTH ||
        head.y < 0 || head.y >= GRID_HEIGHT) {
        return 1;
    }
    return 0;
}
