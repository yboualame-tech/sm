#ifndef GAME_H
#define GAME_H

#include "snake.h"
#include "food.h"

typedef struct {
    Snake* snake;
    Food* food;
    int score;
    int game_over;
    int move_counter;
    int move_interval;
} Game;

Game* game_create(void);
void game_free(Game* game);
void game_update(Game* game);
void game_handle_input(Game* game);
void game_render(Game* game);
void game_reset(Game* game);

#endif
