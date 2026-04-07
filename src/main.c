#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <termios.h>
#include <fcntl.h>
#include <sys/select.h>
#include <string.h>
#include "game.h"

// Terminal utilities
struct termios original_termios;

void disable_canonical_mode(void) {
    struct termios raw = original_termios;
    tcgetattr(STDIN_FILENO, &original_termios);
    
    raw = original_termios;
    raw.c_lflag &= ~(ECHO | ICANON);
    raw.c_cc[VMIN] = 0;
    raw.c_cc[VTIME] = 0;
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw);
    
    int flags = fcntl(STDIN_FILENO, F_GETFL, 0);
    fcntl(STDIN_FILENO, F_SETFL, flags | O_NONBLOCK);
}

void restore_canonical_mode(void) {
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &original_termios);
    int flags = fcntl(STDIN_FILENO, F_GETFL, 0);
    fcntl(STDIN_FILENO, F_SETFL, flags & ~O_NONBLOCK);
}

void clear_screen(void) {
    printf("\033[2J\033[H");
    fflush(stdout);
}

void render_game(Game* game) {
    clear_screen();
    
    printf("╔");
    for (int x = 0; x < GRID_WIDTH; x++) printf("═");
    printf("╗\n");

    // Draw grid
    for (int y = 0; y < GRID_HEIGHT; y++) {
        printf("║");
        for (int x = 0; x < GRID_WIDTH; x++) {
            int is_snake = 0;
            int is_head = 0;
            
            // Check if this position has snake
            for (int i = 0; i < game->snake->length; i++) {
                if (game->snake->body[i].x == x && game->snake->body[i].y == y) {
                    is_snake = 1;
                    if (i == 0) is_head = 1;
                    break;
                }
            }
            
            if (is_head) {
                printf("@");
            } else if (is_snake) {
                printf("o");
            } else if (game->food->x == x && game->food->y == y) {
                printf("*");
            } else {
                printf(" ");
            }
        }
        printf("║\n");
    }

    printf("╚");
    for (int x = 0; x < GRID_WIDTH; x++) printf("═");
    printf("╝\n");

    printf("\nScore: %d | Length: %d | Speed Level: %d\n", 
           game->score, game->snake->length, 7 - game->move_interval);
    
    if (game->game_over) {
        printf("\n🔴 GAME OVER! 🔴\n");
        printf("Press 'R' to restart or 'Q' to quit\n");
    } else {
        printf("Controls: Arrow keys (↑↓←→) or WASD\n");
    }
}

Direction get_direction_from_key(char key) {
    switch (key) {
        case 'w':
        case 'W':
            return UP;
        case 's':
        case 'S':
            return DOWN;
        case 'a':
        case 'A':
            return LEFT;
        case 'd':
        case 'D':
            return RIGHT;
        default:
            return (Direction)-1;
    }
}

void handle_input(Game* game, char key) {
    Direction dir = get_direction_from_key(key);
    if (dir != (Direction)-1) {
        snake_change_direction(game->snake, dir);
    } else if ((key == 'r' || key == 'R') && game->game_over) {
        game_reset(game);
    } else if (key == 'q' || key == 'Q') {
        exit(EXIT_SUCCESS);
    }
}

int main(void) {
    tcgetattr(STDIN_FILENO, &original_termios);
    disable_canonical_mode();
    
    printf("🐍 Welcome to Snake Game!\n");
    printf("Press any key to start...\n");
    getchar();

    clear_screen();

    Game* game = game_create();
    if (game == NULL) {
        fprintf(stderr, "Failed to create game\n");
        restore_canonical_mode();
        return EXIT_FAILURE;
    }

    int frame_count = 0;
    int frame_delay = 50000; // microseconds (50ms = ~20fps)

    while (1) {
        // Handle input
        char c;
        if (read(STDIN_FILENO, &c, 1) > 0) {
            handle_input(game, c);
        }

        // Update
        game_update(game);

        // Render every few frames
        if (frame_count++ % 1 == 0) {
            render_game(game);
        }

        usleep(frame_delay);
    }

    game_free(game);
    restore_canonical_mode();

    return EXIT_SUCCESS;
}

