const Exercises = require('./Exercises');

describe("Exercises Tests", () => {
    let ex;

    beforeEach(() => {
        ex = new Exercises();
    });

    // --- Exercise 1 ---
    test("isEven should return true for even numbers", () => {

        expect(ex.isEven(4)).toBeTruthy();
    });

    test("isEven should return false for odd numbers", () => {

        expect(ex.isEven(5)).toBeFalsy();
    });

    // --- Exercise 2 ---
    test("removeAtLeastOne should reduce the length of the array", () => {
        const input = [1, 2, 3, 4, 5];
        const initialLength = input.length;

        const result = ex.removeAtLeastOne(input);

        expect(result.length).toBeLessThan(initialLength);
    });

    // --- Exercise 3 ---
    test("simplify should remove special symbols", () => {
        const str = "Hello, World!";
        const result = ex.simplify(str);

        expect(result).toBe("Hello World");
    });

    test("simplify should remove all listed symbols", () => {
        const str = "H.e#l,l'o!";
        const result = ex.simplify(str);
        expect(result).toBe("Hello");
    })

    // --- Exercise 4 ---
    test("validate should return error object if no booleans exist", () => {
        const input = ["string", 1, null];
        const result = ex.validate(input);

        expect(result).toEqual({ error: "Need at least one boolean" });
    });

    test("validate should return true if more trues than falses", () => {
        const input = [true, true, false, "ignored"];
        expect(ex.validate(input)).toBe(true);
    });

    test("validate should return false if trues are not greater than falses", () => {
        const input = [true, false, false];
        expect(ex.validate(input)).toBe(false);
    });

    test("isEven should handle negative even numbers", () => {
        expect(ex.isEven(-4)).toBeTruthy();
    });

    test("removeAtLeastOne should empty an array of length 1", () => {
        const input = ["onlyOne"];
        const result = ex.removeAtLeastOne(input);
        expect(result.length).toBe(0);
    });

    test("simplify should return empty string if input is only symbols", () => {
        const result = ex.simplify("!!!###...");
        expect(result).toBe("");
    });

    test("validate should return false on a tie", () => {
        const input = [true, false];
        expect(ex.validate(input)).toBe(false);
    });

    test("add should call Array.prototype.push", () => {

        const spy = jest.spyOn(Array.prototype, 'push');

        ex.add(1, 2);

        expect(spy).toHaveBeenCalled();

        expect(spy).toHaveBeenCalledWith(1, 2);

        spy.mockRestore();
    });
});