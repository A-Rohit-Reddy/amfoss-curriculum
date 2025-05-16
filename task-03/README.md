#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define MAX_INPUT 1024
#define MAX_ARGS 64

void display_prompt() {
    printf("hukum> ");
}

void read_input(char *input) {
    fgets(input, MAX_INPUT, stdin);
    input[strcspn(input, "\n")] = 0; // Remove newline character
}

void parse_input(char *input, char **args) {
    char *token = strtok(input, " ");
    int i = 0;
    while (token != NULL) {
        args[i++] = token;
        token = strtok(NULL, " ");
    }
    args[i] = NULL;
}

void execute_command(char **args) {
    if (args[0] == NULL) {
        printf("hukum: expected command\n");
        return; // No command entered
    }
    if (strcmp(args[0], "exit") == 0) {
        exit(0);
    } else if (strcmp(args[0], "cd") == 0) {
        if (args[1] == NULL) {
            fprintf(stderr, "hukum: expected argument to \"cd\"\n");
        } else {
            if (chdir(args[1]) != 0) {
                perror("mysh");
            }
        }
        return;
    } else if (strcmp(args[0], "pwd") == 0) {
        char cwd[1024];
        if (getcwd(cwd, sizeof(cwd)) != NULL) {
            printf("%s\n", cwd);
        } else {
            perror("mysh");
        }
        return;
    }

    pid_t pid = fork();
    if (pid < 0) {
        perror("fork failed");
    } else if (pid == 0) {
        if (execvp(args[0], args) == -1) {
            perror("hukum");
        }
        exit(EXIT_FAILURE);
    } else {
        waitpid(pid, NULL, 0);
    }
}

int main() {
    char input[MAX_INPUT];
    char *args[MAX_ARGS];

    while (1) {
        display_prompt();
        read_input(input);
        parse_input(input, args);
        execute_command(args);
    }

    return 0;
}
