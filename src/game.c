#include <stdlib.h>
#include "../include/game.h"

Game* game_create(void) {
    Game* game = (Game*)malloc(sizeof(Game));
    if (game == NULL) {
        return NULL;
    }

    game->snake = snake_create();
    game->food = food_create();
    game->score = 0;
    game->game_over = 0;
    game->move_counter = 0;
    game->move_interval = 6; // Adjust for speed (lower = faster)

    if (game->snake == NULL || game->food == NULL) {
        game_free(game);
        return NULL;
    }

    return game;
}

void game_free(Game* game) {
    if (game != NULL) {
        snake_free(game->snake);
        food_free(game->food);
        free(game);
    }
}

void game_update(Game* game) {
    if (game->game_over) {
        return;
    }

    game->move_counter++;

    if (game->move_counter >= game->move_interval) {
        game->move_counter = 0;

        // Move snake
        snake_move(game->snake);

        // Check collision with walls
        if (snake_out_of_bounds(game->snake)) {
            game->game_over = 1;
            return;
        }

        // Check collision with self
        if (snake_collides_with_self(game->snake)) {
            game->game_over = 1;
            return;
        }

        // Check food collision
        if (food_eaten(game->food, game->snake->body[0].x, game->snake->body[0].y)) {
            snake_grow(game->snake);
            game->score += 10;
            food_generate(game->food);
            
            // Increase difficulty
            if (game->move_interval > 2) {
                game->move_interval--;
            }
        }
    }
}

void game_handle_input(Game* game) {
    (void)game; // Unused parameter - handled in main.c
}

void game_render(Game* game) {
    (void)game; // Unused parameter - handled in main.c
}

void game_reset(Game* game) {
    snake_free(game->snake);
    food_free(game->food);

    game->snake = snake_create();
    game->food = food_create();
    game->score = 0;
    game->game_over = 0;
    game->move_counter = 0;
    game->move_interval = 6;
}
