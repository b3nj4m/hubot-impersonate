### hubot-impersonate

Enable Hubot to learn from chat history and impersonate users.

```
Bob: pizza is super good
Alice: hubot impersonate bob
Hubot: impersonating Bob
Eve: I love pizza
Hubot: pizza is super
...
```

### Model

Currently uses simple Markov chain based on [markov-respond](https://github.com/b3nj4m/node-markov). I'm using [msgpack](https://npmjs.org/package/msgpack) to store the model efficiently.

### Configuration

#### Operation mode

Set the mode of operation (default 'train'). Can be one of 'train', 'respond', 'train_respond'.

```
HUBOT_IMPERSONATE_MODE=mode
```

#### Minimum number of words

Ignore messages with fewer than `N` words (default 1).

```
HUBOT_IMPERSONATE_MIN_WORDS=N
```

#### Initialization timeout

Wait for N milliseconds for hubot to initialize and load brain data from redis. (default 10000)

```
HUBOT_IMPERSONATE_INIT_TIMEOUT=N
```

#### Case sensitivity

Whether to keep the original case of words. (default false)

```
HUBOT_IMPERSONATE_CASE_SENSITIVE=true|false
```

#### Strip punctuation

Whether to strip punctuation/symbols from messages. (default false)

```
HUBOT_IMPERSONATE_STRIP_PUNCTUATION=true|false
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

