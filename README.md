# msw-axios-issue (CRA)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps

Install the dependencies and run the tests:
```bash
$ yarn
$ yarn test
```

## Expected behavior

The call to the API endpoint should be intercepted by `msw` and return a mocked JSON object which would make the test pass.

## Actual behavior

The call seems to be intercepted by `msw` but the `response.data` from `axios` has an empty string.

See first log output when running the tests:

```
  console.log
    API response: { data: '' }
```

It's comming from `src/components/Posts.js:13` where it was expecting to receive some data from the endpoint call.