#ifndef SNAKE_H
#define SNAKE_H

#include <stdint.h>

#define GRID_WIDTH 30
#define GRID_HEIGHT 15
#define MAX_SNAKE_LENGTH (GRID_WIDTH * GRID_HEIGHT)

typedef enum {
    UP,
    DOWN,
    LEFT,
    RIGHT
} Direction;

typedef struct {
    int x;
    int y;
} Segment;

typedef struct {
    Segment body[MAX_SNAKE_LENGTH];
    int length;
    Direction direction;
    Direction next_direction;
} Snake;

Snake* snake_create(void);
void snake_free(Snake* snake);
void snake_move(Snake* snake);
void snake_change_direction(Snake* snake, Direction dir);
void snake_grow(Snake* snake);
int snake_collides_with_self(Snake* snake);
int snake_out_of_bounds(Snake* snake);
void snake_render(Snake* snake);

#endif
