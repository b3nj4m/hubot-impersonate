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

#### Minimum number of words

Ignore messages with fewer than `N` words.

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

