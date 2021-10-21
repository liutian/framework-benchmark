import * as moduleA from "./moduleA.mjs";
import * as moduleB from "./moduleB.mjs";

moduleA.add();
moduleA.print();
moduleB.print();

moduleB.minus();
moduleA.print();
moduleB.print();