/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var objectUtils = require('utils/object_utils');

describe('utils/object_utils', function() {
  describe('#recursiveTree()', function() {
    var testObj = {
      a1: {
        a2: 'v1',
        a3: {
          a4: {
            a5: {
              a6: 'v2',
              a7: 'v3'
            }
          }
        }
      }
    };
    it('should return correct tree of childs', function(){
      var result = objectUtils.recursiveTree(testObj);
      expect(result).to.eql('a2 (/a1)<br/>a5 (/a1/a3/a4)<br/>');
    });

    it('should return `null` if type missed', function() {
      var result = objectUtils.recursiveTree('{ a1: "v1"}');
      expect(result).to.be.null;
    });
  });
  describe('#recursiveKeysCount()', function() {
    var tests = [
      {
        m: 'should return 1 child',
        e: 3,
        obj: {
          a1: {
            a2: 'v1',
            a3: 'v2',
            a4: {
              a5: 'v3'
            }
          }
        }
      },
      {
        m: 'should return 1 childs',
        e: 1,
        obj: {
          a1: 'c1'
        }
      },
      {
        m: 'should return `null`',
        e: null,
        obj: 'a1'
      }
    ];
    tests.forEach(function(test){
      it(test.m, function() {
        expect(objectUtils.recursiveKeysCount(test.obj)).to.be.eql(test.e);
      });
    });
  });

  describe('#deepEqual', function() {
    it('simple values', function() {
      expect(objectUtils.deepEqual(true, true)).to.true;
    });
    it('simple values strict', function() {
      expect(objectUtils.deepEqual(true, 1)).to.false;
    });
    it('simple with complex', function() {
      expect(objectUtils.deepEqual(true, {})).to.false;
    });
    it('complex with simple', function() {
      expect(objectUtils.deepEqual({}, 2)).to.false;
    });
    it('simple objects', function() {
      var a = {
        value: 1
      };
      var b = {
        value: 1
      };
      expect(objectUtils.deepEqual(a, b)).to.true;
    });
    it('simple objects failed', function() {
      var a = {
        value: 1,
        c: 1
      };
      var b = {
        value: 1
      };
      expect(objectUtils.deepEqual(a, b)).to.false;
    });
    it('complex objects', function() {
      var a = {
        value: 1,
        c: {
          d: {
            x: {
              val: 1
            }
          }
        }
      };
      var b = {
        value: 1,
        c: {
          d: {
            x: {
              val: 1
            }
          }
        }
      };
      expect(objectUtils.deepEqual(a, b)).to.true;
    });
    it('complex objects failed', function() {
      var a = {
        value: 1,
        c: {
          d: {
            x: {
              val: 1
            }
          }
        }
      };
      var b = {
        value: 1,
        c: {
          d: {
            x: {
              val: 2
            }
          }
        }
      };
      expect(objectUtils.deepEqual(a, b)).to.false;
    });
    it('complex array', function() {
      var a = [1,2,{a: 2}, 4, {b:{}}];
      var b = [1,2,{a: 2}, 4, {b:{}}];
      expect(objectUtils.deepEqual(a, b)).to.true;
    });
    it('complex array failed', function() {
      var a = [1,3,{a: 2}, 4, {b:{}}];
      var b = [1,2,{a: 2}, 4, {b:{}}];
      expect(objectUtils.deepEqual(a, b)).to.false;
    });
    it('simple array', function() {
      var a = [1,3];
      var b = [1,3];
      expect(objectUtils.deepEqual(a, b)).to.true;
    });
    it('simple array failed', function() {
      var a = [3,1];
      var b = [1,3];
      expect(objectUtils.deepEqual(a, b)).to.false;
    });
  });

});
