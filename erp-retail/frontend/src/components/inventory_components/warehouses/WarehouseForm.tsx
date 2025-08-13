import React, { useState, useEffect} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Label } from '../../ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../ui/button';

interface Warehouse {
  id: string;
  name: string;
  description: string;
  address: string;
  status: string;
}

interface ProductFormProps {
  initialData?: Warehouse | null;
}