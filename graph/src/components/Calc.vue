<template>
    <div class="calc">
    
    <div class="errorDivi">
      {{ err }}
    </div>
    <input id="input1" v-model.number.lazy="arg1"/>
    <input id="input2" v-model.number.lazy="arg2"/>
    = {{ result }}<br />
    <div class="keyboard">
      <button
        v-for="operand in operands"
        :key="operand"
        :title="operand"
        @click="calculate(operand)"
      >
        {{ operand }}
      </button>
    </div>
    
    <div class="screenBoard">
      <input type="checkbox" id="keyB" v-model="showBoard" />
      <label for="keyB">Включить экранную клавиатуру</label>
        
        
        <div class="board" v-show="showBoard">
          <button
            v-for="(number, i) in numbers"
            @click="numb(number, num)"
            :key="i"
          >
            {{ number }}
          </button>
          <button @click="del(num)">Удалить</button>
          <div>
            <input v-model="num" type="radio" name="arg1" value="true" />
            <label>Поле 1</label>
            <input v-model="num" type="radio" name="arg2" value="false" />
            <label>Поле 2</label>
          </div>
        </div>
      
    </div>
    
    <div class="logs">
      История ввода
      <hr>
      <div v-for="(log, id) in logs" :key="id">{{ log }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalcHelp",
  props: {
    msg: String,
  },
  data() {
    return {
      arg1: "",
      arg2: "",
      result: 0,
      numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      num: null,
      operands: ["+", "-", "*", "/", "/int", "pow"],
      err: "",
      logs: {},
      showBoard: false,
    };
  },
  methods: {
    setboard() {
      this.boardInput.push();
    },
    calculate(operation = "+") {
      this.err = "";
      switch (operation) {
        case "+":
          this.sum();
          break;
        case "-":
          this.difference();
          break;
        case "*":
          this.multiply();
          break;
        case "/":
          this.division();
          break;
        case "/int":
          this.divInt();
          break;
        case "pow":
          this.pow();
          break;
      }
      const key = Date.now();
      const value = `${this.arg1}${operation}${this.arg2}=${this.result}`;
      this.$set(this.logs, key, value);
    },
    sum() {
      this.result = Number(this.arg1) + Number(this.arg2);
    },
    difference() {
      this.result = this.arg1 - this.arg2;
    },
    multiply() {
      this.result = this.arg1 * this.arg2;
    },
    division() {
      if (this.arg2 === 0) {
        this.result = "Ошибка!";
        this.err = "На ноль делить нельзя!";
      } else {
        this.result = this.arg1 / this.arg2;
      }
    },
    divInt() {
      if (this.arg2 === 0) {
        this.result = "Ошибка!";
        this.err = "На ноль делить нельзя!";
      } else {
        this.result = Math.floor(this.arg1 / this.arg2);
      }
    },
    pow() {
      this.result = Math.pow(this.arg1, this.arg2);
    },
    numb(number, num = "true") {
      if (num === "true") {
        this.arg1 += number;
      } else if (num === null) {
        this.arg1 += number;
      } else {
        this.arg2 += number;
      }
    },
    del(value) {
      let str;
      if (value === "true") {
        str = this.arg1.slice(0, -1);
        this.arg1 = str;
      } else {
        str = this.arg2.slice(0, -1);
        this.arg2 = str;
      }
    },
  },
};
</script>
<style lang="scss" scoped>

</style>