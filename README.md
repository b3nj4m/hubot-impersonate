### hubot-impersonate

Enable Hubot to learn from chat history and impersonate users.

```
//TODO example
```

### Model

Currently uses simple Markov chain based on [markov-respond](https://github.com/b3nj4m/node-markov).

### Configuration

#### Operation mode

Set the mode of operation (default 'train'). Can be one of 'train', 'respond', 'train_respond'.

```
HUBOT_IMPERSONATE_MODE=mode
```

#### Markov order

Set the order of the Markov chain (default 3).

```
HUBOT_IMPERSONATE_MARKOV_ORDER=N
```

### Commands

#### Impersonate

Start impersonating `<user>`.

```
hubot impersonate <user>
```

#### Stop

Stop impersonating.

```
hubot stop impersonating
```

