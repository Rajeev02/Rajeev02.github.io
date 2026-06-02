You can get `"Banana"` by splitting the string and accessing the second element:

```javascript
let text = "Apple, Banana, Kiwi";

let result = text.split(", ")[1];

console.log(result); // Banana
```

Or using destructuring:

```javascript
let text = "Apple, Banana, Kiwi";

let [, banana] = text.split(", ");

console.log(banana); // Banana
```

If you want to **search for "Banana"** instead of accessing it by index, you can use `find()`, `includes()`, or `indexOf()`.

### Using `find()`

```javascript
let text = "Apple, Banana, Kiwi";
let result = text.split(", ");

let fruit = result.find((item) => item === "Banana");

console.log(fruit); // Banana
```

### Using `includes()`

```javascript
let text = "Apple, Banana, Kiwi";
let result = text.split(", ");

console.log(result.includes("Banana")); // true
```

### Using `indexOf()`

```javascript
let text = "Apple, Banana, Kiwi";
let result = text.split(", ");

console.log(result.indexOf("Banana")); // 1
```

### Without `split()`

If you just want to check whether the string contains `"Banana"`:

```javascript
let text = "Apple, Banana, Kiwi";

console.log(text.includes("Banana")); // true
```

For interviews, remember:

- `includes()` → returns `true/false`
- `indexOf()` → returns position or `-1`
- `find()` → returns the actual element found
- `filter()` → returns all matching elements in an array.

You can use `fetch()` like this:

```javascript
fetch("https://dummy-json.mock.beeceptor.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Using async/await (modern approach)

```javascript
async function getPosts() {
  try {
    const response = await fetch("https://dummy-json.mock.beeceptor.com/posts");

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

getPosts();
```

### Print only post titles

```javascript
async function getPosts() {
  try {
    const response = await fetch("https://dummy-json.mock.beeceptor.com/posts");

    const posts = await response.json();

    posts.forEach((post) => {
      console.log(post.title);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getPosts();
```

Common interview follow-up:

- `fetch()` returns a **Promise**.
- `await fetch()` waits for the HTTP response.
- `response.json()` also returns a **Promise**, so it needs another `await`.
- Network errors are caught by `catch`/`try-catch`. HTTP errors like 404/500 do not automatically throw; you should check `response.ok` if needed.


If by "without predefined function" you mean **don't use `flat()`**, you can flatten it using recursion:

```javascript
const arr = [1, [2, [3, [4]], 5]];

const result = [];

const flatten = (input) => {
  for (const item of input) {
    if (Array.isArray(item)) {
      flatten(item);
    } else {
      result.push(item);
    }
  }
};

flatten(arr);

console.log(result); // [1, 2, 3, 4, 5]
```

### Interview Version (using reduce)

```javascript
const arr = [1, [2, [3, [4]], 5]];

const flatten = (arr) =>
  arr.reduce(
    (acc, curr) =>
      acc.concat(Array.isArray(curr) ? flatten(curr) : curr),
    []
  );

console.log(flatten(arr)); // [1, 2, 3, 4, 5]
```

### If `flat()` is allowed

```javascript
const arr = [1, [2, [3, [4]], 5]];

console.log(arr.flat(Infinity)); // [1, 2, 3, 4, 5]
```

For React Native/JavaScript interviews, the recursive solution is usually what interviewers expect when they say "flatten nested array without using predefined functions."



const getPosts = async () => {

    try{

      const response = await fetch("https://dummy-json.mock.beeceptor.com/posts");
      const posts = await response.json();
       
       console.log(posts);
       posts.forEach(post =>{
         console.log(JSON.stringify(post))


         console.log(post.title)
       })

    } catch (error) {
      console.error("Error", error);
    }
   }
useEffect(()=>{
  getPosts();

},[])
