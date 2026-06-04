<!-- INDEX_START --> 
<details>
 <summary>📖<b>samagri taalika (vistar karne ke liye click karen)</b></summary> 

-[📈 dhara 1: jatilta aur big o notation](#section-1-complexity-big-o-notation)
 -[1. samanya samay jatiltaayen (dakshta dwara cramit)](#1-common-time-complexities-ordered-by-efficiency)
 -[2. antriksh jatilta](#2-space-complexity)
-[🧩 dhara 2: mukhya algorithm pattern](#section-2-key-algorithmic-patterns)
 -[1. hashmap aur set (lagaatar samay lukup)](#1-hashmap-set-constant-time-lookup)
 -[2. do suchak (ishtam scan)](#2-two-pointers-optimal-scans)
 -[3. sliding window (upsariyan)](#3-sliding-window-subarrays)
 -[4. stack (aakhiri-in-farst-out)](#4-stack-last-in-first-out)
 -[5. graph traversal: bfs banaam dfs](#5-graph-traversals-bfs-vs-dfs)
 -[chaudai-pratham khoj (bfs)](#breadth-first-search-bfs)
 - [1. samanya samay jatiltaayen (dakshta dwara cramit)](#1-common-time-complexities-ordered-by-efficiency)0 
</details>
<!-- INDEX_END -->

## 📈 khand 1: jatilta aur big o notation
*⏱️ 1 minute padhen*

sakshatkarkarta **big o notation** ka upyog karke unki dakshata ke aadhar par algoridam ka mulyankan karte han, jo kisi function ke seemit vyavahar ka varnan karta hai jab tark anant ki or jata hai।

### 1. samanya samay jatiltaayen (dakshta dwara crambaddh)

| big o | jatilta naam | vivran/udaharan |
| :--- | :--- | :--- |
| **$O(1)$** | **nirantar samay** | runtime input aakaar par nirbhar nahin karta hai. udaharan: index dwara kisi aire tatv tak pahunchna, hashmap kunji se maan ka samadhan karna। |
| **$O(\log N)$** | **laghugankiy samay** | samasya ka aakaar pratyek charan par ek sthir karak dwara vibhajit kiya jata hai। udaharan: binary khoj। |
| **$O(N)$** | **raikhik samay** | runtime input aakaar $N$ ke saath aanupatik roop se mapta hai। udaharan: kisi sarni ko scan karna, nyuntam maan gyat karna। |
| **$O(N \log N)$** | **raikhik ankiy samay** | samasyaon ko vibhajit karne aur unhen jodne par hota hai। udaharan: merge sort, quick sort, ya js mein`Array.prototype.sort()`par call karna। |
| **$O(N^2)$** | **dvighat samay** | runtime chatushkoniya roop se scale karta hai। udaharan: nested loop, bubble sort। |
| **$O(2^N)$** | **ghatiy samay** | pratyek jod ke saath runtime doguna ho jata hai। udaharan: punravarti fibonatchi। |

---

### 2. antriksh jatilta
- space jatilta input aakaar $N$ ke sapeksh algoridam dwara aavantit kul memory space ko mapti hai।
- **in-place algoridam ($O(1)$ space)** atirikt ere ya object aavantit kiye bina sidhe input tarkon ko badalen (udaharan ke liye, maanon ki adla-badli)।
- **out-of-place algoridam ($O(N)$ space)** input aakaar ke aanupatik memory bafars aavantit karen (udaharan ke liye,`Set`ya hash map mein visit kiye gaye nodes ko sangrahit karna)।

---

## 🧩 dhara 2: mukhya algorithm patern
*⏱️ 5 minute padhen*

adhikansh screening sakshatkar samasyaon ko paanch moolbhoot pattern mein vighatit kiya ja sakta hai।

### 1. hashmap aur set (lagaatar samay lukup)
- **samasya sanketak**: bar-bar khojna, duplicate ko track karna, chaurahon ki jaanch karna, item aavrittiyon ki ginti karna।
- **tantra**: manak saraniyon mein $O(N)$ se`.includes()`tak ki raikhik khoj jatilta hoti hai। ek hash set ya hash map kunji strings ko memory blockon ko nirdeshit karne ke liye hashing function ka upyog karta hai, jo nirantar $O(1)$ ausat samay mein lookeup ko hal karta hai।
- **udaharan (lakshya yog yugm ki jaanch)**:
 ```javascript
 // Time Complexity: O(N) | Space Complexity: O(N)
 function hasPairWithSum(arr, targetSum) {
 const seen = new Set();
 for (const num of arr) {
 if (seen.has(targetSum - num)) {
 return true; // Match found in O(1) time
 }
 seen.add(num);
 }
 return false;
 }
 ```

### 2. do pointers (ishtam scan)
- **samasya sanketak**: krambaddh saraniyan, taron ko ultna, tatv yugmon ki khoj karna।
- **tantra**: nested loops ($O(N^2)$) ke saath saraniyon ko scan karne ke bajay, do pointer index (aamtaur par`left = 0`aur `right = array.length - 1`) ko inicializ karen। sashart niyamon ke aadhar par kendra ki or pointers ko badhaen ya ghataen, ekal $O(N)$ raikhik paas mein ganana puri karen।
- **udaharan (crambaddh sarni mein lakshya yog dundhna)**:
 ```javascript
 // Time Complexity: O(N) | Space Complexity: O(1)
 function hasTwoSumSorted(arr, target) {
 let left = 0;
 let right = arr.length - 1;
 while (left < right) {
 const sum = arr[left] + arr[right];
 if (sum === target) return true;
 if (sum < target) {
 left++; // Shift right to increase sum
 } else {
 right--; // Shift left to decrease sum
 }
 }
 return false;
 }
 ```

### 3. sliding window (upsariyan)
- **samasya sanketak**: satat upsarni, mandand se mail khate sabse lambe/chhote sabastring।
- **tantra**:`left`aur`right`seemaon dwara darshaye gaye ek gatisheel window frame ko banae rakhen। jaise hi`right`pointer naye data ko grahan karne ke liye window ka vistar karta hai, mandand badhaon ko banae rakhne ke liye`left`pointer ko anubandhit karen। yah $O(N)$ samay mein nishpadit hone wale overlaping segment ke liye maanon ki punarganana se bachta hai।
- **udaharan (aakar k ka adhiktam yog upsarni)**:
 ```javascript
 // Time Complexity: O(N) | Space Complexity: O(1)
 function maxSumSubarray(arr, k) {
 let maxSum = 0;
 let windowSum = 0;
 for (let i = 0; i < arr.length; i++) {
 windowSum += arr[i]; // Add current element
 if (i >= k - 1) {
 maxSum = Math.max(maxSum, windowSum);
 windowSum -= arr[i - (k - 1)]; // Evict element going out of window
 }
 }
 return maxSum;
 }
 ```

### 4. stack (last-in-farst-out)
- **samasya sanketak**: santulit bracket milan, purvavat sanchalan, compyler layout ko pars karna।
- **tantra**: stack ek LIFO nishpaadan niyam lagu karta hai। itemon ko sheersh par dhakela jata hai aur sheersh se hata diya jata hai। yah nested rishton ko manya karne ke liye aadarsh hai (udaharan ke liye, yah jaanchna ki kya shuruaati bracket nikattam samapan bracket se mail khate han)।
- **udaharan (manya koshthak)**:
 ```javascript
 // Time Complexity: O(N) | Space Complexity: O(N)
 function isValidParentheses(str) {
 const stack = [];
 const mapping = { ")": "(", "}": "{", "]": "[" };
 for (const char of str) {
 if (char in mapping) {
 const topElement = stack.pop();
 if (topElement !== mapping[char]) return false;
 } else {
 stack.push(char); // Store opening bracket
 }
 }
 return stack.length === 0;
 }
 ```

### 5. graph traversal: bfs banaam dfs
graph ko **aasannta suchi** (padosiyon ke saraniyon ke liye ek hashmap mapping node kunji) ka upyog karke darshaya jata hai।
```javascript
const graph = {
 A: ["B", "C"],
 B: ["D"],
 C: ["E"],
 D: [],
 E: []
};
```

#### chaudai-pratham khoj (bfs)
- **tantra**: jad se shuru karke star-dar-star nodes ka anveshan karta hai। yah **katar (FIFO)** sanrachna ka upyog karta hai।
- **iske liye sarvashreshth**: bina bharit graph mein sabse chhota path dundhna।
- **udaharan**:
 ```javascript
 // Time Complexity: O(V + E) | Space Complexity: O(V)
 function bfs(startNode) {
 const queue = [startNode];
 const visited = new Set([startNode]);
 while (queue.length > 0) {
 const node = queue.shift();
 console.log(node); // Process current node
 for (const neighbor of graph[node]) {
 if (!visited.has(neighbor)) {
 visited.add(neighbor);
 queue.push(neighbor);
 }
 }
 }
 }
 ```

#### gahrai-pahli khoj (dfs)
- **tantra**: peeche jaane se pehle pratyek shakha mein jitna sambhav ho utna gahrai se anveshan karta hai। yah **rikarson** (ander-d-hud call stack) ka upyog karta hai।
- **iske liye sarvashreshth**: exposing path, chakra ka pata lagaana, aur topological sorting।
- **udaharan**:
 ```javascript
 // Time Complexity: O(V + E) | Space Complexity: O(V)
 function dfs(node, visited = new Set()) {
 visited.add(node);
 console.log(node); // Process current node
 for (const neighbor of graph[node]) {
 if (!visited.has(neighbor)) {
 dfs(neighbor, visited);
 }
 }
 }
 ```