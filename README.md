# ember-cli-giphy

Based on Rob Dodson's [&lt;x-giphy&gt;](https://github.com/robdodson/x-giphy)

## Usage

`npm install --save-dev ember-cli-giphy`

```hbs
{{!-- term --}}
{{x-giphy term='fail'}}

{{!-- random --}}
{{x-giphy term='fail' random=true}}

{{!-- id --}}
{{x-giphy gifId='m6aIggqT7oB4A'}}

{{!-- translate --}}
{{x-giphy term='fail' translate=true}}

{{!-- key --}}
{{x-giphy key='dc6zaTOxFJmzC' term='face palm'}}
```

## Development & Examples

* `git clone` this repository
* `ember server`
* Visit http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
