import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  const { full_name, email, password, role } = req.body;

  // Validation
  if (!full_name || !email || !password || !role) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Check Existing User
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Password Hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name,
        email,
        password: hashedPassword,
        role,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  const token = jwt.sign(
    {
      id: data.id,
      email: data.email,
      role: data.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(201).json({
    message: "User Registered Successfully",
    token,
    user: data,
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // Check Existing User
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  // Password Verification
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  // Generate JWT Token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user,
  });
}

export async function getProfile(req, res) {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
}