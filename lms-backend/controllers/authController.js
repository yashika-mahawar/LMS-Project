import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createNotification } from "../utils/createNotification.js";
export async function registerUser(req, res) {
  const { full_name, email, password, role, program } = req.body;

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
        program,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
await createNotification(
  "admin",
  `${full_name} registered as a new student`
);
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

// authController.js mein loginUser function:
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // FIX: Use maybeSingle() instead of single()
    // authController.js
const { data: user, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .maybeSingle(); // Yeh crash nahi hone dega

if (error) {
  return res.status(500).json({ message: "DB Error" });
}

if (!user) {
  return res.status(404).json({ message: "User nahi mila!" });
}

    // Password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function getProfile(req, res) {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
}
export async function updateProfileImage(req, res) {
  try {
    const { id } = req.params;
    const { profile_image } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({
        profile_image: profile_image,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Profile image updated",
      user: data,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}