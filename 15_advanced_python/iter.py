import itertools

class num_iter:
    def __init__(self,start,stop,step):
        self.start = start
        self.cur   = start-1
        self.stop  = stop
        self.step  = step
    def __iter__(self):
        self.cur = self.start
        return self
    def next(self):
        if self.cur < self.stop-self.step+1:
            self.cur += self.step
            return self.cur
        else:
            raise StopIteration
    __next__ = next

def generator_num_iter(start, stop, step):
    start -= step
    while start < stop-step+1:
        start += step
        yield start

class GeneratorGetter(object):
    def __init__(self,generator_function):
        self.f = generator_function
    def get(self):
        return self.f()

class ReusableGenerator(object):
    def __init__(self,iterable):
        self.iterable = iterable
    def get(self):
        for i in self.iterable:
            yield i

class GeneratorMapper(object):
    def __init__(self,rg,f):
        self.rg = rg
        self.f  = f
    def get(self):
        g = self.rg.get()
        # for i in g:
        #     yield self.f(i)

        return itertools.imap(self.f,g)

class GeneratorBatcher(object):
    def __init__(self,rg, num_batch = 4):
        self.rg = rg
        self.num_batch = num_batch
    def get(self):
        g = self.rg.get()
        b = []
        for i in g:
            b.append(i)
            if len(b) == self.num_batch:
                yield b
                b = []

for i in num_iter(100,200,3):
    print i

for i in generator_num_iter(100,200,3):
    print i

g1 = generator_num_iter(100,200,3)
g2 = generator_num_iter(0,100,3)

#z  = zip(g1,g2)
#z_i = itertools.izip(g1,g2)

def square(x):
    return x**2

def inverse(x):
    return 1.0/x

g_squared = itertools.imap(square,g1)
g_squared_squared = itertools.imap(square, g_squared)
print list(g_squared_squared)
g_squared_inverse = itertools.imap(inverse, g_squared)
print list(g_squared_inverse)

l = list(range(100))
rgl = ReusableGenerator(l)
rgl_squared = GeneratorMapper(rgl,square)
rgl_squared_batch = GeneratorBatcher(rgl_squared)
