// Copyright (c) 2015, <your name>. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'package:angular/application_factory.dart';
import 'package:dacsslide/presentation.dart';
import 'package:pretty_samples/pretty_samples.dart';
import 'package:dacsslide_remote/dacsslide_remote.dart';


main() => applicationFactory()
    .addModule(new PresentationModule())
    .addModule(new RemoteControllerModule())
    .addModule(new SamplesModule())
    .run();